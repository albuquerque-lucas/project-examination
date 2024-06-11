import { useEffect, useContext } from 'react';
import { ExamsContext } from '@/app/lib/context/ExamsContext';
import { DirectedNavigationProps } from "@/app/lib/types/navigationTypes";
import { motion } from 'framer-motion';
import { updateLinks } from '@/app/lib/utils/updateNavLinks';
import { getQuestionsByExam } from '@/app/lib/api/examsAPI';
import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';

const ExamNavButtons: React.FC<DirectedNavigationProps> = (props) => {
  const {
    currentPage,
    setCurrentPage,
    queryParams,
    setQueryParams,
    filterList,
    setQuestions,
    setQuestionList,
    setQuestionsNavLinks,
    questionsCurrentPage,
    setQuestionsCurrentPage,
  } = useContext(ExamsContext);

  const { links, id } = props;
  let linksList = updateLinks(links);

  const getPage = async (url: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof url === 'undefined' || url === null) return;
    try {
      const urlObj = new URL(url);
      const page = urlObj.searchParams.get('page');
      setCurrentPage(Number(page));
      setQueryParams([...filterList, { filter: 'page', value: page ? page : ''}]);


      const response = await getQuestionsByExam(url, { exam_id: id , page: page ? page : '' });
      setQuestions(response);
      response && setQuestionList(response.data);
      response && setQuestionsNavLinks(response.links);
      if (response) {
        linksList = updateLinks(response.links);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
  }, [queryParams])

  return (
    <div className={style.examinations_navbuttons}>
      {linksList && linksList.length > 0 ? (
        linksList.map((item, index) => (
          <motion.button
            whileTap={item.active || item.url === null ? {} : { scale: 0.9 }}
            key={index}
            className={style.examinations_navbutton__buttons}
            onClick={(e) => getPage(item.url, e)}
            disabled={item.active || item.url === null}
          >
            {item.label}
          </motion.button>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ExamNavButtons;
