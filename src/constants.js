import { PiFilePng, PiFileTxt } from "react-icons/pi";

export const ALLOWED_FILE_TYPES = {
  png: {
    type: "image/png",
    icon: <PiFilePng />,
  },
  txt: {
    type: "text/plain",
    icon: <PiFileTxt />,
  },
};
