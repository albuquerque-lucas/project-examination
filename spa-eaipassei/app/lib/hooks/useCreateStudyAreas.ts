'use client';

import { useContext, useRef } from "react";
import { StudyAreasContext } from "../context/StudyAreasContext";
import { createStudyArea } from "@/app/lib/api/StudyAreasAPI";
import { StudyAreasFormRequest } from "../types/studyAreasTypes";