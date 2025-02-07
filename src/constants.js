import { PiFilePng, PiFileTxt } from "react-icons/pi";

export const ALLOWED_FILE_TYPES = [
  {
    extension: "png",
    type: "image/png",
    icon: <PiFilePng />,
  },
  {
    extension: "txt",
    type: "text/plain",
    icon: <PiFileTxt />,
  },
];
