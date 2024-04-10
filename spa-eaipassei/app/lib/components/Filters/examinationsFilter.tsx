'use client';

import { useEffect, useState, useContext, useRef } from "react";
import { ExaminationsContext } from "../../context/ExaminationsContext";
import { BiSearch } from 'react-icons/bi';
import { IoMdAddCircle } from "react-icons/io";
import { ExaminationFilterList } from "../../types/examinationTypes";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/filters/examinationsFilters.module.css';

export default function ExaminationsFilters() {
  const [filterBy, setFilterBy] = useState("");
  const {
    setSelectedOrder,
    filterList,
    setFilterList,
    setFilterMessage,
    queryParams,
    setQueryParams,
    setLoaded,
  } = useContext(ExaminationsContext);

  const textInputRef = useRef<HTMLInputElement>(null);
  const selectInputRef = useRef<HTMLSelectElement>(null);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  }

  const addToFilterList = () => {
    let filterValue = "";
    if (filterBy === "educational_level_id" || filterBy === "order") {
      filterValue = selectInputRef.current?.value || "";
    } else {
      filterValue = textInputRef.current?.value || "";
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
  }

  const submitFilters = () => {
    console.log('FILTER LIST DE SUBMIT FILTERS', filterList);
    setQueryParams(filterList);
    setLoaded(false);
  }


  useEffect(() => {
  }, [filterList, queryParams]);

  return (
    <div className={ style.filters_list }>
      <div className={ style.filter_selection_box }>
        <select onChange={handleFilterChange} className={ style.filter_type_select } >
          <option value="">Filtrar por:</option>
          <option value="title">Título</option>
          <option value="institution">Instituição</option>
          <option value="educational_level_id">Nível Educacional</option>
          <option value="order">Ordenar</option>
        </select>
        { filterBy !== "educational_level_id" &&
          filterBy !== "order" &&

          <input
            ref={ textInputRef }
            type="text"
            placeholder="Pesquisar"
            disabled={ filterBy === '' }
          />}

        { filterBy === "educational_level_id" && (
          <select ref={ selectInputRef } >
            <option value="1">Nível Médio</option>
            <option value="2">Nível Superior</option>
            <option value="3">Pós-Graduação</option>
          </select>
        )}
        { filterBy === "order" && (
          <select ref={ selectInputRef } className={ style.filter_type_select } >
            <option value="">Ordenar por:</option>
            <option value="desc">Mais recentes</option>
            <option value="asc">Mais antigos</option>
          </select>
        )}
          <motion.button
            className={ style.search_button }
            onClick={ addToFilterList }
            whileTap={{ scale: 0.9 }}
            whileHover={{ backgroundColor: "#343a40", cursor: "pointer" }}
            >
            <IoMdAddCircle />
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