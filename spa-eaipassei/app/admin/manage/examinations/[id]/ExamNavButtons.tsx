import { useEffect, useContext } from 'react';
import { ExamsContext } from '@/app/lib/context/ExamsContext';
import { NavigationButtonsProps } from "@/app/lib/types/navigationTypes";
import { motion } from 'framer-motion';
import { updateLinks } from '@/app/lib/utils/updateNavLinks';
import { getExams, getQuestionsByExam } from '@/app/lib/api/examsAPI';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';

const ExamNavButtons: React.FC<NavigationButtonsProps | null> = (props) => {
  const {
    currentPage,
    setCurrentPage,
    queryParams,
    setQueryParams,
    filterList,
    setData,
    setSecondaryData,
    setSecondaryDataList,
    setSecondaryNavLinks,
  } = useContext(ExamsContext);
  useEffect(() => {
  }, [currentPage]);

  if (!props) {
    return (
      <div>
      </div>
    );
  }

  const { links } = props;

  let linksList = updateLinks(links);

  const getPage = async (url: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof url === 'undefined' || url === null) return;
    try {
      const urlObj = new URL(url);
      const page = urlObj.searchParams.get('page');
      setCurrentPage(Number(page));
  
      const updatedQueryParams = {
        ...queryParams,
        page: page ? Number(page) : undefined,
      };

      setQueryParams([...filterList, { filter: 'page', value: page ? page : '' }]);
  
      const response = await getQuestionsByExam(url, updatedQueryParams);
      setSecondaryData(response);
      response && setSecondaryDataList(response.data);
      response && setSecondaryNavLinks(response.links);
      if (response) {
        linksList = updateLinks(response.links);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <motion.div
      className={ style.examinations_navbuttons }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      >
      {
        linksList && linksList.length > 0 ? (
          linksList.map((item, index) => (
            <motion.button
            whileTap={ item.active || item.url === null ? {} : { scale: 0.9 } }
              key={ index }
              className={ style.examinations_navbutton__buttons }
              onClick={ (e) => getPage(item.url, e) }
              disabled={ item.active || item.url === null }
            >
              {item.label}
            </motion.button>
          ))
        ) : (
          <div></div>
        )
      }
    </motion.div>
  )
}

export default ExamNavButtons;