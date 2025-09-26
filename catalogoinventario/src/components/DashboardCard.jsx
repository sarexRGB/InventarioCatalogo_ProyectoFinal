import React from 'react'
import { Package, FileText, Users, TrendingUp, TrendingDown } from 'lucide-react';


  function DashboardCard({ title, value, variation }) {
    const renderIcon = () => {
      switch (title) {
        case 'Equipos Totales':
          return <Package className="cardIcon" />;
        case 'Contratos Activos':
          return <FileText className="cardIcon" />;
        case 'Choferes Disponibles':
          return <Users className="cardIcon" />;
        default:
          return null;
      }
    };

    const renderVariationIcon = () => {
        if (!variation) return null;
        const isPositive = !variation.startsWith('-');
        const Icon = isPositive ? TrendingUp : TrendingDown;
        const variationClassName = `variation-icon ${isPositive ? 'positive' : 'negative'}`;
        return <Icon size={12} className={variationClassName} />;
    };

    const variationClass = variation && variation.startsWith('+') ? 'variation-positive' : 'variation-negative';

    return (
      <div>
        <div className="dashboardCard">
          <div className="card-header">
                <h4 className="card-title">{title}</h4>
                {renderIcon()}
            </div>
            <div className="card-content">
                <span className="card-value">{value}</span>
                <span className={`card-variation ${variationClass}`}>
                    {renderVariationIcon()}
                    {variation}
                </span>
            </div>
        </div>
      </div>
    )
  }

export default DashboardCard