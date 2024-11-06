// pdf.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { MediaService } from '../media/media.service';
import { readFileSync } from 'fs';

@Injectable()
export class PdfService {
  constructor(private mediaService: MediaService) {}
  async generateResumePdf(data: any): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([800, 1400]);
    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = height - 50;
    // fetch image from media service
    if (data.photo) {
      const filePath = this.mediaService.getFilePath(data.photo);
      const imageBytes = readFileSync(filePath);
      const image = await pdfDoc.embedJpg(imageBytes); // or embedPng for PNG images
      y -= 200; // Adjust spacing between entries
      page.drawImage(image, {
        x: 50,
        y: y, // Position the image at the top
        width: 200,
        height: 200,
      });
      y -= 50; // Adjust spacing between entries
    }

    // Example content
    page.drawText(`Name: ${data.name}`, {
      x: 50,
      y,
      size: 20,
      font,
      color: rgb(0, 0, 0),
    });

    y -= 30; // Adjust spacing between entries

    page.drawText(`Address: ${data.address}`, {
      x: 50,
      y,
      size: 15,
      font,
      color: rgb(0, 0, 0),
    });

    y -= 30; // Adjust spacing between entries

    page.drawText('Educations:', {
      x: 50,
      y,
      size: 15,
      font,
      color: rgb(0, 0, 0),
    });

    y -= 30; // Adjust spacing between entries

    // Loop through each education entry in the array
    data.educations.forEach((education: Prisma.EducationCreateInput) => {
      // Format each education entry
      const educationText = `${education.degree} in ${education.field_of_study} - ${education.school} (${education.start_year} - ${education.end_year || 'Present'})`;

      // Draw each education item and adjust the position for each new line
      page.drawText(educationText, {
        x: 50,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      y -= 20; // Adjust spacing between entries
    });

    y -= 10; // Adjust spacing between sections

    // experience

    page.drawText('Experiences:', {
      x: 50,
      y,
      size: 15,
      font,
      color: rgb(0, 0, 0),
    });

    y -= 30; // Adjust spacing between entries

    // Loop through each experience entry in the array
    data.experiences.forEach((experience: Prisma.ExperienceCreateInput) => {
      // Format each experience entry
      const experienceText = `${experience.position} at ${experience.company} (${experience.start_year} - ${experience.end_year || 'Present'})`;

      // Draw each experience item and adjust the position for each new line
      page.drawText(experienceText, {
        x: 50,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      y -= 20; // Adjust spacing between entries
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }
}
