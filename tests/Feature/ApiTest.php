<?php

namespace Tests\Feature;

use App\Models\Application;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_content_is_served_from_defaults(): void
    {
        $this->getJson('/api/content')
            ->assertOk()
            ->assertJsonPath('brand.name', 'Oluseed')
            ->assertJsonCount(12, 'projects');
    }

    public function test_login_rejects_wrong_password(): void
    {
        $this->postJson('/api/auth/login', ['email' => 'admin@admin.com', 'password' => 'nope'])->assertStatus(401);
    }

    public function test_login_returns_token_and_protects_admin_routes(): void
    {
        config(['oluseed.admin_email' => 'admin@admin.com', 'oluseed.admin_password' => 'secret-pass']);

        $this->getJson('/api/applications')->assertStatus(401);

        $token = $this->postJson('/api/auth/login', ['email' => 'admin@admin.com', 'password' => 'secret-pass'])
            ->assertOk()
            ->json('token');

        $this->withToken($token)->getJson('/api/auth/me')->assertOk()->assertJsonPath('user.email', 'admin@admin.com');

        // Password change in .env re-syncs the stored hash on next login.
        config(['oluseed.admin_password' => 'new-pass']);
        $this->postJson('/api/auth/login', ['email' => 'admin@admin.com', 'password' => 'secret-pass'])->assertStatus(401);
        $this->postJson('/api/auth/login', ['email' => 'admin@admin.com', 'password' => 'new-pass'])->assertOk();
    }

    public function test_visitor_can_subscribe(): void
    {
        $this->postJson('/api/subscribers', ['email' => 'fan@example.com'])->assertCreated();
        $this->postJson('/api/subscribers', ['email' => 'fan@example.com'])->assertCreated();
        $this->assertDatabaseCount('subscribers', 1);
        $this->postJson('/api/subscribers', ['email' => 'nope'])->assertStatus(422);
    }

    public function test_admin_can_update_a_section_and_reset(): void
    {
        Sanctum::actingAs(User::admin());

        $this->patchJson('/api/content/footer', ['ctaTitle' => 'Hello', 'blurb' => 'x'])
            ->assertOk()
            ->assertJsonPath('content.footer.ctaTitle', 'Hello');

        $this->getJson('/api/content')->assertJsonPath('footer.ctaTitle', 'Hello');

        $this->patchJson('/api/content/nope', [])->assertStatus(404);

        $this->postJson('/api/content/reset')->assertOk();
        $this->getJson('/api/content')->assertJsonPath('footer.ctaTitle', "Got an awesome idea? Let's build it together.");
    }

    public function test_visitor_can_submit_an_application_with_cv(): void
    {
        Storage::fake('public');

        $cvUrl = $this->post('/api/upload/cv', ['file' => UploadedFile::fake()->create('cv.pdf', 100, 'application/pdf')])
            ->assertOk()
            ->json('url');

        $this->postJson('/api/applications', [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'jobId' => 'frontend-dev',
            'jobTitle' => 'Frontend Developer',
            'coverLetter' => 'Hello',
            'cvUrl' => $cvUrl,
        ])->assertCreated();

        $this->assertDatabaseCount('applications', 1);
        $this->assertNotNull(Application::first()->cv_path);

        $this->postJson('/api/applications', ['name' => '', 'email' => 'x'])->assertStatus(422);

        Sanctum::actingAs(User::admin());
        $list = $this->getJson('/api/applications')->assertOk()->json();
        $this->assertSame('Ada Lovelace', $list[0]['name']);
        $this->assertSame('new', $list[0]['status']);

        $this->patchJson('/api/applications/'.$list[0]['id'], ['status' => 'shortlisted'])
            ->assertOk()
            ->assertJsonPath('status', 'shortlisted');
    }

    public function test_internships_are_listed_and_applications_are_tagged(): void
    {
        $this->getJson('/api/content')->assertOk()->assertJsonPath('internships.items.0.id', 'frontend-intern');
        $this->getJson('/api/content?locale=fr')->assertJsonPath('pages.internships.eyebrow', 'Stages');

        $this->postJson('/api/applications', [
            'type' => 'internship',
            'jobId' => 'frontend-intern',
            'jobTitle' => 'Frontend Engineering Intern',
            'name' => 'Grace Hopper',
            'email' => 'grace@example.com',
        ])->assertCreated();

        $this->postJson('/api/applications', ['type' => 'bogus', 'name' => 'X', 'email' => 'x@example.com'])->assertStatus(422);

        Sanctum::actingAs(User::admin());
        $list = $this->getJson('/api/applications')->assertOk()->json();
        $this->assertSame('internship', $list[0]['type']);
        $this->assertSame(1, $this->getJson('/api/admin/overview')->json('internshipApplications'));
        $this->assertSame(4, $this->getJson('/api/admin/overview')->json('openInternships'));
    }

    public function test_cv_upload_rejects_other_file_types(): void
    {
        Storage::fake('public');

        $this->post('/api/upload/cv', ['file' => UploadedFile::fake()->create('notes.txt', 10, 'text/plain')], ['Accept' => 'application/json'])
            ->assertStatus(422);
    }

    public function test_contact_messages_flow(): void
    {
        $this->postJson('/api/messages', ['name' => 'Grace', 'email' => 'grace@example.com', 'message' => 'Hi'])->assertCreated();

        Sanctum::actingAs(User::admin());
        $list = $this->getJson('/api/messages')->assertOk()->json();
        $this->assertFalse($list[0]['read']);

        $this->patchJson('/api/messages/'.$list[0]['id'], ['read' => true])->assertJsonPath('read', true);
        $this->deleteJson('/api/messages/'.$list[0]['id'])->assertOk();
        $this->assertDatabaseCount('contact_messages', 0);
    }

    public function test_content_is_served_per_language_and_lists_stay_in_sync(): void
    {
        $this->getJson('/api/content?locale=fr')
            ->assertOk()
            ->assertJsonPath('home.hero.line1', 'Impulsion,');

        Sanctum::actingAs(User::admin());

        // Add a project in English: it appears in French too, with mirrored image/link.
        $projects = $this->getJson('/api/content')->json('projects');
        array_unshift($projects, ['id' => 'new-app', 'title' => 'New App', 'tag' => 'SaaS', 'category' => 'Platforms', 'description' => 'English text', 'image' => '/images/x.png', 'link' => 'https://new.app', 'featured' => true]);
        $this->patchJson('/api/content/projects', $projects)->assertOk();

        $fr = $this->getJson('/api/content?locale=fr')->json('projects');
        $this->assertSame('new-app', $fr[0]['id']);
        $this->assertSame('https://new.app', $fr[0]['link']);

        // Translate it in French: text stays per-language, structure follows English.
        $fr[0]['description'] = 'Texte français';
        $this->patchJson('/api/content/projects?locale=fr', $fr)->assertOk();
        $this->assertSame('English text', $this->getJson('/api/content')->json('projects.0.description'));
        $this->assertSame('Texte français', $this->getJson('/api/content?locale=fr')->json('projects.0.description'));

        // Remove it in English: gone in French as well.
        array_shift($projects);
        $this->patchJson('/api/content/projects', $projects)->assertOk();
        $this->assertNotSame('new-app', $this->getJson('/api/content?locale=fr')->json('projects.0.id'));

        // Unknown locales fall back to English.
        $this->getJson('/api/content?locale=xx')->assertJsonPath('home.hero.line1', 'Ignition,');
    }

    public function test_spa_is_served_for_front_end_routes(): void
    {
        $this->get('/admin/projects')->assertOk()->assertSee('id="root"', false);
    }
}
