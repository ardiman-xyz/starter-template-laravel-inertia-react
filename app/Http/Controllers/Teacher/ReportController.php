<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\Browsershot\Browsershot;
use Spatie\Browsershot\Exceptions\CouldNotTakeBrowsershot;
use Spatie\LaravelPdf\Facades\Pdf;
use function Spatie\LaravelPdf\Support\pdf;

class ReportController extends Controller
{
    /**
     * @throws CouldNotTakeBrowsershot
     */
    public function index(Request $request)
    {

        $html = view('preview')->render();

        $nodePath = trim(shell_exec('which node'));

        $npmPath = trim(shell_exec('which npm'));

        Browsershot::html($html)
            ->showBackground()
            ->setNodeBinary($nodePath)
            ->setNpmBinary($npmPath)
            ->save(storage_path("/app/reports/example.pdf"));
    }

    public function preview()
    {

       return view("preview");
    }
}
