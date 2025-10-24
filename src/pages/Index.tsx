import { useState } from "react";
import { Database, Upload, Droplets, Brain, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";
import DataUpload from "@/components/DataUpload";
import DataCleaning from "@/components/DataCleaning";
import ModelTraining from "@/components/ModelTraining";
import ResultsPanel from "@/components/ResultsPanel";

type Section = "upload" | "cleaning" | "training" | "results";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("upload");

  const sections = [
    {
      id: "upload" as Section,
      label: "Carga de Datos",
      icon: Upload,
      component: DataUpload,
      variant: "default" as const,
    },
    {
      id: "cleaning" as Section,
      label: "Limpieza de Datos",
      icon: Droplets,
      component: DataCleaning,
      variant: "secondary" as const,
    },
    {
      id: "training" as Section,
      label: "Entrenamiento del Modelo",
      icon: Brain,
      component: ModelTraining,
      variant: "accent" as const,
    },
    {
      id: "results" as Section,
      label: "Resultados",
      icon: BarChart3,
      component: ResultsPanel,
      variant: "success" as const,
    },
  ];

  const ActiveComponent = sections.find((s) => s.id === activeSection)?.component || DataUpload;

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-2xl animate-pulse-glow">
              <Database className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Sistema de Machine Learning
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plataforma completa para limpieza, entrenamiento y modelado de datos usando{" "}
            <span className="text-primary font-semibold">Pandas</span>,{" "}
            <span className="text-secondary font-semibold">NumPy</span>,{" "}
            <span className="text-accent font-semibold">PyTorch</span> y{" "}
            <span className="text-success font-semibold">Scikit-learn</span>
          </p>
        </header>

        {/* Navigation Buttons */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  variant={activeSection === section.id ? section.variant : "outline"}
                  size="lg"
                  className={`h-auto py-6 flex-col gap-3 ${
                    activeSection === section.id ? "ring-2 ring-offset-2 ring-current" : ""
                  }`}
                >
                  <Icon className="w-8 h-8" />
                  <span className="text-sm font-semibold text-center leading-tight">
                    {section.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Active Section */}
        <div className="max-w-3xl mx-auto">
          <ActiveComponent />
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>Conecta con tu backend y base de datos externa mediante API</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
