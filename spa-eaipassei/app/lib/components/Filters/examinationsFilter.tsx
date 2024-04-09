'use client';

import { useEffect, useState, useContext, useRef } from "react";
import { ExaminationsContext } from "../../context/ExaminationsContext";
import { BiSearch } from 'react-icons/bi';
import { BsFillXSquareFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { IoMdAddCircle } from "react-icons/io";
import { ExaminationFilterList } from "../../types/examinationTypes";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/filters/examinationsFilters.module.css';
import SelectedFiltersBar from "../SelectedFiltersBar/selectedFiltersBar";

export default function ExaminationsFilters() {
  const [filterBy, setFilterBy] = useState("");
  const {
    setSelectedOrder,
    filterList,
    setFilterList,
    setFilterMessage,
  } = useContext(ExaminationsContext);
  const selectRef = useRef<HTMLSelectElement>(null);

  const textInputRef = useRef<HTMLInputElement>(null);
  const selectInputRef = useRef<HTMLSelectElement>(null);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  }

  const orderSelectionClick = () => {
    if (selectRef.current) {
      console.log(selectRef.current.value);
      setSelectedOrder(selectRef.current.value);
    } else {
      console.log('Nenhum valor selecionado');
    }
    resetInputsAndSelects();
  }

  const addToFilterList = () => {
    let filterValue = "";
    if (filterBy !== "educational_level") {
      filterValue = textInputRef.current?.value || "";
    } else {
      filterValue = selectInputRef.current?.value || "";
    }
  
    // Se filterValue for nulo ou uma string vazia, retorne e não adicione o novo filtro
    if (!filterValue) {
      setFilterMessage("O valor do filtro não pode ser vazio");
      return;
    }
  
    const newFilter: ExaminationFilterList = {
      filter: filterBy,
      value: filterValue,
    };
  
    // Verifique se o filtro já existe
    const existingFilterIndex = filterList.findIndex(filter => filter.filter === newFilter.filter);
    if (existingFilterIndex !== -1) {
      // Se o valor do filtro existente for o mesmo, retorne e não adicione o novo filtro
      if (filterList[existingFilterIndex].value === newFilter.value) {
        setFilterMessage("Este filtro já foi adicionado");
        return;
      } else {
        // Se o valor do filtro existente for diferente, remova o filtro existente
        filterList.splice(existingFilterIndex, 1);
      }
    }
  
    // Verifique se já existem 3 filtros
    if (filterList.length >= 3) {
      setFilterMessage("Não é possível adicionar mais de 3 filtros");
      return;
    }
  
    setFilterList(prevFilterList => [...prevFilterList, newFilter]);
    resetInputsAndSelects();
  }

  const resetInputsAndSelects = () => {
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
    if (selectInputRef.current) {
      selectInputRef.current.value = "";
    }
    if (selectRef.current) {
      selectRef.current.value = "";
    }
  }

  const submitFilters = () => {
    const params: { [key: string]: string } = filterList.reduce((acc, filter) => {
      acc[filter.filter] = filter.value;
      return acc;
    }, {} as { [key: string]: string });
    console.log(params);
  }


  useEffect(() => {
  }, [filterList]);

  return (
    <div className={ style.filters_list }>
      <div className={ style.filter_selection_box }>
        <select onChange={handleFilterChange} className={ style.filter_type_select } >
          <option value="">Filtrar por:</option>
          <option value="name">Nome</option>
          <option value="institution">Instituição</option>
          <option value="educational_level">Nível Educacional</option>
        </select>
        { filterBy !== "educational_level" && <input ref={ textInputRef } type="text" placeholder="Pesquisar" disabled={ filterBy === '' }/>}
        { filterBy === "educational_level" && (
          <select ref={ selectInputRef } >
            <option value="1">Nível Médio</option>
            <option value="2">Nível Superior</option>
            <option value="3">Pós-Graduação</option>
          </select>
        )}
        {/* {filterBy !== "" && ( */}
          <motion.button
            className={ style.search_button }
            onClick={ addToFilterList }
            whileTap={{ scale: 0.9 }}
            whileHover={{ backgroundColor: "#343a40", cursor: "pointer" }}
            >
            <IoMdAddCircle />
          </motion.button>
        {/* // )} */}
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
      <motion.button
        onClick={ submitFilters }
        className={ style.submit_filters__btn }
        whileTap={{ scale: 0.9 }}
      >
        Filtrar
      </motion.button>
    </div>
  )
}