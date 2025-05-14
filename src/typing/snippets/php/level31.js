export default [
  "$image = imagecreatefromjpeg('input.jpg'); imagefilter($image, IMG_FILTER_GRAYSCALE); imagepng($image, 'output.png'); imagedestroy($image);",
  "$pdf = new FPDF(); $pdf->AddPage(); $pdf->SetFont('Arial','B',16); $pdf->Cell(40,10,'Hello World!'); $pdf->Output();",
  "use PhpOffice\\PhpSpreadsheet\\Spreadsheet; $spreadsheet = new Spreadsheet();",
  "// Level 31: Stubs for common tasks like image/PDF/Excel manipulation.",
  "exif_read_data('image.jpg', 'IFD0');"
];
