<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeInterface extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:interface {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create new Interface';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $interfaceName = 'I' . ucfirst($name);

        $directoryPath = app_path('Interfaces');
        if (!File::exists($directoryPath)) {
            File::makeDirectory($directoryPath, 0755, true);
        }

        $content = "<?php\n\nnamespace App\Interfaces;\n\ninterface {$interfaceName}\n{\n    // Define methods your service needs to implement\n}";

        $path = app_path("Interfaces/{$interfaceName}.php");

        File::put($path, $content);

        $this->info("Interface {$interfaceName} created successfully.");
    }
}
