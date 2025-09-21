// Importar modelo y vista
import { VehicleModel } from '../models/vehicleModel';
import { ResponseView, VehicleView } from '../views/vehicleViews';

const VehicleController = {
    // obtener todos los vehiculos
    getVehicles: () => {
        const vehicles = VehicleModel.readVehicles();

        return ResponseView.formatResponse(vehicles);
    },

    // agregar vehiculos
    addVehicle: (newVehicle) => {
        const vehicles = VehicleModel.readVehicles();

        vehicles.push(newVehicle);

        VehicleModel.writeVehicle(vehicles);

        return ResponseView.formatResponse({messaje: "Vehiculo agregado con éxito"});
    }
}

export { VehicleController };