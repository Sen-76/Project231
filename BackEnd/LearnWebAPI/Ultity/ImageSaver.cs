using System;
using System.IO;

namespace BackEnd.Ultity
{
    public class ImageSaver
    {
        public static void SaveImage(IFormFile file, Guid imageId)
        {
            try
            {
                string directFolder = Directory.GetCurrentDirectory();
                string directoryPath = Path.Combine(directFolder, "FrontEnd\\src\\ImageSave\\");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                using (FileStream fs = new FileStream(directoryPath + imageId + file.FileName, FileMode.Create, FileAccess.Write))
                {
                    file.CopyTo(fs);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error saving image: " + ex.Message);
            }
        }
    }
}
