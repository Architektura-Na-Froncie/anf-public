import React from "react";
import classes from './Panel.module.css';

export interface PanelProps {
  title?: string;
  icon?: string;
  iconHelp?: string;
  iconBadge?: string;
}

const Panel: React.FC<PanelProps> = (props) => {
  const { children, title, icon, iconHelp, iconBadge } = props;

  return (
    <div className={classes.panel}>
      <div className={classes.panelHeader}>
        <h1 className={classes.panelTitle}>{title}</h1>
        <span className={[classes.panelIcon, classes[`panelIcon${icon}`]].join(' ')} title={iconHelp || icon} />
        {!!iconBadge && <span className={classes.panelIconBadge}>{iconBadge}</span>}
      </div>
      <div className={classes.panelBody}>
        {children}
      </div>
    </div>
  )
}

export default Panel;
