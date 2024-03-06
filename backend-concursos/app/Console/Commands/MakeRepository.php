<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeRepository extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create new repository';
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $repositoryName = $name;
    
        $directoryPath = app_path('Repositories');
        if (!File::exists($directoryPath)) {
            File::makeDirectory($directoryPath, 0755, true);
        }
    
        $content = "<?php\n\nnamespace App\Repositories;\n\nuse App\Models\\{$name};\n\nclass {$repositoryName}\n{\n    // Implement your repository logic here\n}";
    
        $path = app_path("Repositories/{$repositoryName}.php");
    
        File::put($path, $content);
    
        $this->info("Repository {$repositoryName} created successfully.");
    }
    
}