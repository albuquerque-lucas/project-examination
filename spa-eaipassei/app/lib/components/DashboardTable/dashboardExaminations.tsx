'use client';

import { useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import style from '@/app/ui/admin/tables/dashboardData.module.css';
import ConfirmationPopUp from "../ConfirmationPopUp/confirmationPopUp";
import { ExaminationsContext } from "../../context/ExaminationsContext";

interface Exam {
  id: number;
  title: string;
  institution: string;
  educational_level: string;
  active: boolean;
  // Adicione mais campos conforme necessário
}

interface DashboardExaminationsProps {
  data: Exam[];
}

export default function DashboardExaminations({ data }: DashboardExaminationsProps) {

  const { dashboardDeletionMode, setDashboardDeletionMode } = useContext(ExaminationsContext);

  return (
    <div className={ style.data_table__container }>
      <table className={ style.data_table }>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Instituição</th>
            <th>Nível de Escolaridade</th>
            <th>Ativo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.institution}</td>
              <td>{item.educational_level}</td>
              <td>{item.active ? 'Ativo' : 'Inativo'}</td>
              <td className={ style.dashboard_delete__buttons }>
                <button
                  className={ style.dashboard_table__delete }
                  onClick={() => setDashboardDeletionMode(true)}
                  >
                  <MdDelete />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}