import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const ModelTraining = () => {
  const { toast } = useToast();
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [model, setModel] = useState("");
  const [framework, setFramework] = useState("");

  const handleTrain = async () => {
    if (!model || !framework) {
      toast({
        title: "Configuración incompleta",
        description: "Selecciona un modelo y un framework",
        variant: "destructive",
      });
      return;
    }

    setTraining(true);
    setProgress(0);

    // Simular progreso de entrenamiento
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTraining(false);
          toast({
            title: "Entrenamiento completado",
            description: `Modelo ${model} entrenado con éxito usando ${framework}`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <Card className="p-6 card-glass animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-accent/10 rounded-lg animate-pulse-glow">
          <Brain className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold gradient-text">Entrenamiento de Modelos</h2>
          <p className="text-muted-foreground text-sm">
            Entrena modelos ML/DL con PyTorch y Scikit-learn
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Framework
            </label>
            <Select value={framework} onValueChange={setFramework}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pytorch">PyTorch</SelectItem>
                <SelectItem value="sklearn">Scikit-learn</SelectItem>
                <SelectItem value="tensorflow">TensorFlow</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              Tipo de Modelo
            </label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Regresión Linear</SelectItem>
                <SelectItem value="random-forest">Random Forest</SelectItem>
                <SelectItem value="neural-network">Red Neuronal</SelectItem>
                <SelectItem value="svm">SVM</SelectItem>
                <SelectItem value="xgboost">XGBoost</SelectItem>
                <SelectItem value="lstm">LSTM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {training && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso de entrenamiento</span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Button
          onClick={handleTrain}
          disabled={training}
          variant="accent"
          size="lg"
          className="w-full"
        >
          {training ? (
            <>
              <Zap className="w-4 h-4 animate-pulse" />
              Entrenando modelo...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Entrenar Modelo
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ModelTraining;
