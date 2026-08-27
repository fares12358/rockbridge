// utils/getFullUrl.js
import { API_BASE } from "./api";

export function getFullUrl(imgPath) {
    if (!imgPath) return "";
    if (/^https?:\/\//i.test(imgPath)) return imgPath; // already absolute
    return `${API_BASE}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
  }
