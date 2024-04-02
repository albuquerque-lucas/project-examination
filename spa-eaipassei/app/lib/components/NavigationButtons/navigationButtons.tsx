import style from '@/app/ui/admin/navigationButtons/navigationButtons.module.css';

interface NavigationButtonsProps {
  navigationLinks: { label: string; }[];
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ navigationLinks }) => {
  return (
    <div className={ style.examinations_navbuttons }>
      {
        navigationLinks && navigationLinks.length > 0 ? (
          navigationLinks.map((item, index) => (
            <button key={index} className={ style.examinations_navbutton__buttons }>
              {item.label}
            </button>
          ))
        ) : (
          <div></div>
        )
      }
    </div>
  )
}

export default NavigationButtons;