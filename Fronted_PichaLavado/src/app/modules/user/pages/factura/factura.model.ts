export interface Factura {
  estado: string;
  reservaId: any;
  id: number;
  fechaEmision: string;
  montoTotal: number;
  reserva: {
    id: number;
    servicio: {
      nombre: string;
      precio: number;
    };
    auto: {
      placa: string;
      modelo: string;
    };
  };
  users: {
    id: number;
    nombre: string;
    correo: string;
  };
}
