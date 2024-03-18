<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeService extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create new Service';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $serviceClassName = ucfirst($name) . 'Service';
    
        $directoryPath = app_path('Services');
        if (!File::exists($directoryPath)) {
            File::makeDirectory($directoryPath, 0755, true);
        }
    
        $content = "<?php\n\nnamespace App\Services;\n\nclass {$serviceClassName}\n{\n    // Implement the logic for your service\n}";
    
        $path = app_path("Services/{$serviceClassName}.php");
    
        File::put($path, $content);
    
        $this->info("Service {$serviceClassName} created successfully.");
    }
}
