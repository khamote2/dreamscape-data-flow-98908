import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DataUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { toast } = useToast();

  // Datos de ejemplo para visualización
  const sampleData = [
    { id: 1, nombre: "Producto A", valor: 125.50, categoria: "Electrónica", stock: 45 },
    { id: 2, nombre: "Producto B", valor: 89.99, categoria: "Hogar", stock: 23 },
    { id: 3, nombre: "Producto C", valor: 234.75, categoria: "Electrónica", stock: 67 },
    { id: 4, nombre: "Producto D", valor: 45.30, categoria: "Ropa", stock: 12 },
    { id: 5, nombre: "Producto E", valor: 178.90, categoria: "Deportes", stock: 34 },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    // Simular carga a backend
    setTimeout(() => {
      setUploading(false);
      setDataLoaded(true);
      toast({
        title: "Archivo cargado exitosamente",
        description: `${file.name} ha sido cargado y procesado`,
      });
    }, 2000);
  };

  return (
    <Card className="p-6 card-glass animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg animate-pulse-glow">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold gradient-text">Cargar Datos</h2>
          <p className="text-muted-foreground text-sm">
            Sube archivos CSV, JSON o Excel para comenzar
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".csv,.json,.xlsx,.xls"
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              {file ? (
                <>
                  <FileText className="w-12 h-12 text-success animate-float" />
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <p className="text-sm font-medium">{file.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Arrastra y suelta tu archivo aquí o haz clic para seleccionar
                  </p>
                  <p className="text-xs text-muted-foreground">
                    CSV, JSON, XLSX (Max 50MB)
                  </p>
                </>
              )}
            </div>
          </label>
        </div>

        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full"
          variant="default"
          size="lg"
        >
          {uploading ? "Cargando..." : "Subir al Servidor"}
        </Button>

        {/* Visualización de Datos */}
        {dataLoaded && (
          <div className="mt-8 space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg animate-pulse-glow">
                <Eye className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">
                  Visualizar Datos
                </h3>
                <p className="text-muted-foreground text-sm">
                  Vista previa y estadísticas de los datos
                </p>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">Total Registros</p>
                <p className="text-2xl font-bold text-primary">{sampleData.length}</p>
              </div>
              <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                <p className="text-xs text-muted-foreground mb-1">Valor Promedio</p>
                <p className="text-2xl font-bold text-success">
                  ${(sampleData.reduce((acc, item) => acc + item.valor, 0) / sampleData.length).toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-xs text-muted-foreground mb-1">Stock Total</p>
                <p className="text-2xl font-bold text-accent">
                  {sampleData.reduce((acc, item) => acc + item.stock, 0)}
                </p>
              </div>
              <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                <p className="text-xs text-muted-foreground mb-1">Categorías</p>
                <p className="text-2xl font-bold text-secondary">
                  {new Set(sampleData.map(item => item.categoria)).size}
                </p>
              </div>
            </div>

            {/* Tabla de Datos */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                Primeros 5 registros
              </h4>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.id}</TableCell>
                        <TableCell>{row.nombre}</TableCell>
                        <TableCell className="text-success font-semibold">
                          ${row.valor.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                            {row.categoria}
                          </span>
                        </TableCell>
                        <TableCell>{row.stock}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DataUpload;
