import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Droplets, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DataCleaning = () => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [operations, setOperations] = useState({
    removeNulls: true,
    removeDuplicates: true,
    normalizeData: false,
    handleOutliers: false,
  });

  const handleClean = async () => {
    setProcessing(true);
    // Simular procesamiento
    setTimeout(() => {
      setProcessing(false);
      toast({
        title: "Datos limpiados exitosamente",
        description: "Se aplicaron todas las operaciones seleccionadas",
      });
    }, 2500);
  };

  return (
    <Card className="p-6 card-glass animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-secondary/10 rounded-lg animate-pulse-glow">
          <Droplets className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold gradient-text">Limpieza de Datos</h2>
          <p className="text-muted-foreground text-sm">
            Preprocesa y limpia tus datos con Pandas
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            Operaciones de Limpieza
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Checkbox
                checked={operations.removeNulls}
                onCheckedChange={(checked) =>
                  setOperations({ ...operations, removeNulls: checked as boolean })
                }
              />
              <label className="text-sm cursor-pointer flex-1">
                Remover valores nulos (dropna)
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Checkbox
                checked={operations.removeDuplicates}
                onCheckedChange={(checked) =>
                  setOperations({ ...operations, removeDuplicates: checked as boolean })
                }
              />
              <label className="text-sm cursor-pointer flex-1">
                Eliminar duplicados (drop_duplicates)
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Checkbox
                checked={operations.normalizeData}
                onCheckedChange={(checked) =>
                  setOperations({ ...operations, normalizeData: checked as boolean })
                }
              />
              <label className="text-sm cursor-pointer flex-1">
                Normalizar datos (StandardScaler)
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Checkbox
                checked={operations.handleOutliers}
                onCheckedChange={(checked) =>
                  setOperations({ ...operations, handleOutliers: checked as boolean })
                }
              />
              <label className="text-sm cursor-pointer flex-1">
                Manejar outliers (IQR method)
              </label>
            </div>
          </div>
        </div>

        <Button
          onClick={handleClean}
          disabled={processing}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          {processing ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Limpiar Datos
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default DataCleaning;
