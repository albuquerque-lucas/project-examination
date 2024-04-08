'use client';

import { useEffect, useState, useContext, useRef } from "react";
import { ExaminationsContext } from "../../context/ExaminationsContext";
import { BiSearch } from 'react-icons/bi';
import { IoMdAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { ExaminationFilterList } from "../../types/examinationTypes";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/filters/examinationsFilters.module.css';

export default function ExaminationsFilters() {
  const [filterBy, setFilterBy] = useState("");
  const { selectedOrder, setSelectedOrder, filterList, setFilterList } = useContext(ExaminationsContext);
  const selectRef = useRef<HTMLSelectElement>(null);

  const textInputRef = useRef<HTMLInputElement>(null);
  const selectInputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    console.log('LISTA DE FILTROS', filterList);
}, [filterList])

const addToFilterList = () => {
  let filterValue = "";
  if (filterBy !== "educational_level") {
    filterValue = textInputRef.current?.value || "";
  } else {
    filterValue = selectInputRef.current?.value || "";
  }

  // Se filterValue for nulo ou uma string vazia, retorne e não adicione o novo filtro
  if (!filterValue) {
    return;
  }

  const newFilter: ExaminationFilterList = {
    filter: filterBy,
    value: filterValue,
  };

  setFilterList(prevFilterList => [...prevFilterList, newFilter]);
}

  const orderSelectionClick = () => {
    if (selectRef.current) {
      console.log(selectRef.current.value);
      setSelectedOrder(selectRef.current.value);
    } else {
      console.log('Nenhum valor selecionado');
    }
  }
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  }

  return (
    <div className={ style.filters_list }>
      <div className={ style.filter_selection_box }>
      <select onChange={handleFilterChange} className={ style.filter_type_select } >
          <option value="">Filtrar por:</option>
          <option value="name">Nome</option>
          <option value="institution">Instituição</option>
          <option value="educational_level">Nível Educacional</option>
        </select>
        { filterBy !== "" && filterBy !== "educational_level" && <input ref={ textInputRef } type="text" placeholder="Pesquisar"/>}
        { filterBy === "educational_level" && (
          <select ref={ selectInputRef } >
            <option value="1">Nível Médio</option>
            <option value="2">Nível Superior</option>
            <option value="3">Pós-Graduação</option>
          </select>
        )}
        {filterBy !== "" && (
          <motion.button
            className={ style.search_button }
            onClick={ addToFilterList }
            whileTap={{ scale: 0.9 }}
            whileHover={{ backgroundColor: "#343a40", cursor: "pointer" }}
            >
            <IoMdAddCircle />
          </motion.button>
        )}
      </div>
      <div className={ style.order_by_box }>
        <select ref={selectRef} className={ style.filter_type_select } >
          <option value="">Ordenar por:</option>
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigos</option>
        </select>
        <motion.button
          className={ style.search_button }
          onClick={orderSelectionClick}
          whileTap={{ scale: 0.9 }}
          whileHover={{ backgroundColor: "#343a40", cursor: "pointer" }}
          >
          <BiSearch />
        </motion.button>
      </div>
      { filterList.length > 0 && (
        <div className={ style.selected_filter_list }>
          {filterList.map((filter, index) => (
            <div key={index} className={ style.selected_filter_item }>
              <span>
                {filter.filter}: {filter.value}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ backgroundColor: "#343a40", cursor: "pointer" }}
              >
                <TiDelete />
              </motion.button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}