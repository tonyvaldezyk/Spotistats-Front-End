import React from 'react';

const Widget2 = ({ key, title, children, className = '', onExpand, expanded }) => {
  
  <Widget
  title="Tonalité musicale du track"
  className="kpi-widget"
  onExpand={() => handleExpand('key')}
  expanded={expandedWidget === 'key'}
>
  {isLoadingKey ? (
    <LoadingSpinner />
  ) : keyError ? (
    <ErrorMessage message="Erreur lors du chargement des données" />
  ) : key?.items ? (
    <DoughnutChart
      data={Object.entries(key.items).map(([key, value]) => ({
        label: key,
        value: value
      }))}
      title="La tonalité musicale"
      colors={[
        '#1ed760', '#1fdf6f', '#d14f21', '#b10f2e', '#f39c12',
        '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#e67e22',
        '#ecf0f1', '#95a5a6'
      ]}
      expanded={expandedWidget === 'key'}
    />
  ) : (
    <div className="placeholder">Aucune donnée disponible</div>
  )}
</Widget>
  
  if (expanded) {
    return (
      <div className="expanded-widget-overlay" onClick={() => onExpand()}>
        <div className="expanded-widget" onClick={e => e.stopPropagation()}>
          <button className="close-button" onClick={() => onExpand()}>
            <RiCloseLine size={24} />
          </button>
          <h3 className="widget-title">{title}</h3>
          <div className="widget-content">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`widget ${className}`} onClick={onExpand}>
      <h3 className="widget-title">{title}</h3>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};



export default Widget2
