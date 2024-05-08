'use client';

import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useFetchEducationalLevels } from "../../hooks/useFetchEducationalLevels";
import { ExaminationsContext } from "../../context/ExaminationsContext";
import { getAllEducationalLevels } from "../../api/educationalLevelsAPI";
import { IoMdAddCircle } from "react-icons/io";
import { ExaminationFilterList } from "../../types/examinationTypes";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/filters/examinationsFilters.module.css';

export default function ExaminationsFilters() {
  const [filterBy, setFilterBy] = useState("");
  const [educationalLevelsLoaded, setEducationalLevelsLoaded] = useState(false);
  const {
    filterList,
    setFilterList,
    setFilterMessage,
    queryParams,
    setQueryParams,
    setExaminationsLoaded,
  } = useContext(ExaminationsContext);

  const {
    educationalLevelsList,
  } = useFetchEducationalLevels();

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
  
    // Se filterValue é nulo ou uma string vazia, retorna e não adiciona o novo filtro
    if (!filterValue) {
      setFilterMessage("O valor do filtro não pode ser vazio");
      return;
    }
  
    const newFilter: ExaminationFilterList = {
      filter: filterBy,
      value: filterValue,
    };
  
    // Verifica se o filtro já existe
    const existingFilterIndex = filterList.findIndex(filter => filter.filter === newFilter.filter);
    if (existingFilterIndex !== -1) {
      // Se o valor do filtro existente é o mesmo, retorna e não adiciona o novo filtro
      if (filterList[existingFilterIndex].value === newFilter.value) {
        setFilterMessage("Este filtro já foi adicionado");
        return;
      } else {
        // Se o valor do filtro existente é diferente, remove o filtro existente
        filterList.splice(existingFilterIndex, 1);
      }
    }
  
    // Verifica se já existem 3 filtros
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

  const submitFilters = useCallback(() => {
    setQueryParams(filterList);
    setExaminationsLoaded(false);
  }, [filterList]);


  useEffect(() => {
  }, [filterList, queryParams, educationalLevelsLoaded]);

  return (
    <div className={ style.filters_list }>
      <div className={ style.filter_selection_box }>
        <select onChange={ handleFilterChange } className={ style.filter_type_select } >
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
            {
              educationalLevelsList.map(level => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))
            }
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
            >
            Adicionar
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