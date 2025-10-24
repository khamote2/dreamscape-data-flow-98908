import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Eye } from "lucide-react";

const ResultsPanel = () => {
  const metrics = [
    { label: "Accuracy", value: "94.2%", color: "text-success" },
    { label: "Precision", value: "91.8%", color: "text-primary" },
    { label: "Recall", value: "89.5%", color: "text-secondary" },
    { label: "F1-Score", value: "90.6%", color: "text-accent" },
  ];

  return (
    <Card className="p-6 card-glass animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-success/10 rounded-lg animate-pulse-glow">
          <BarChart3 className="w-6 h-6 text-success" />
        </div>
        <div>
          <h2 className="text-2xl font-bold gradient-text">Resultados</h2>
          <p className="text-muted-foreground text-sm">
            Métricas y visualización del modelo
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/20 hover:scale-105 transition-transform"
            >
              <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
              <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
          <div className="flex items-center justify-center h-32">
            <BarChart3 className="w-16 h-16 text-primary/40 animate-float" />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Gráficos de visualización aparecerán aquí
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="success" className="flex-1">
            <Eye className="w-4 h-4" />
            Visualizar
          </Button>
          <Button variant="secondary" className="flex-1">
            <Download className="w-4 h-4" />
            Descargar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ResultsPanel;
