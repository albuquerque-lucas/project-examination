'use client';

import { useState, useRef, useContext } from 'react';
import { NoticesContext } from '../context/NoticesContext';
import { Notice, NoticeFormRequest } from '../types/noticeTypes';
import { createNotice } from '../api/noticesAPI';

export const useCreateNotices = () => {
}