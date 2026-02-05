import multer from "multer";

const storage = multer.memoryStorage(); // MUST be memoryStorage for buffer
const upload = multer({ storage });

export default upload;
