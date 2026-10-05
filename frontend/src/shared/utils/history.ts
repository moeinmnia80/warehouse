import { type NavigateFunction } from "react-router";

export const backToPrevPage = (navigate: NavigateFunction) => navigate(-1);
