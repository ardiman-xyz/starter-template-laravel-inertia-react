<?php

// 1. Command untuk backfill data existing
// File: app/Console/Commands/BackfillTeachingDevices.php

namespace App\Console\Commands;

use App\Models\Assessment;
use App\Models\TeachingDevice;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class BackfillTeachingDevices extends Command
{
    protected $signature = 'teaching-devices:backfill';
    protected $description = 'Create teaching device records for existing assessments';

    public function handle()
    {
        $this->info('Starting backfill for teaching devices...');

        // Get all assessments that don't have teaching devices
        $assessmentsWithoutDevices = Assessment::whereDoesntHave('teachingDevices')->get();

        if ($assessmentsWithoutDevices->isEmpty()) {
            $this->info('No assessments found without teaching devices.');
            return;
        }

        $this->info("Found {$assessmentsWithoutDevices->count()} assessments without teaching devices.");

        $bar = $this->output->createProgressBar($assessmentsWithoutDevices->count());
        $bar->start();

        $successCount = 0;
        $errorCount = 0;

        foreach ($assessmentsWithoutDevices as $assessment) {
            try {
                TeachingDevice::create([
                    'assessment_id' => $assessment->id,
                    'name' => 'Perangkat Pembelajaran',
                    'description' => 'Upload dokumen perangkat pembelajaran seperti RPS, Silabus, RPP, atau dokumen pendukung lainnya',
                    'is_required' => true,
                    'is_uploaded' => false,
                    'file_name' => null,
                    'file_path' => null,
                    'file_size' => null,
                    'file_type' => null,
                    'uploaded_at' => null,
                    'created_at' => $assessment->created_at,
                    'updated_at' => $assessment->updated_at,
                ]);

                $successCount++;
            } catch (\Exception $e) {
                $this->error("Error creating teaching device for assessment {$assessment->id}: " . $e->getMessage());
                $errorCount++;
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();

        $this->info("Backfill completed!");
        $this->info("Successfully created: {$successCount} teaching devices");
        if ($errorCount > 0) {
            $this->warn("Errors encountered: {$errorCount}");
        }
    }
}