export function isValidISO8601(fecha: any) {
    // Expresión regular para validar el formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Verifica el formato de la fecha
    if (!regex.test(fecha)) {
        return false;
    }

    // Crea un objeto Date a partir de la fecha
    const [año, mes, dia] = fecha.split('-').map(Number);
    const fechaObj = new Date(año, mes - 1, dia);

    // Verifica si la fecha es válida
    return fechaObj.getFullYear() === año &&
        fechaObj.getMonth() === mes - 1 &&
        fechaObj.getDate() === dia;
}

export function formatDate(value: any): string {
    // Verifica si el argumento es una instancia de Date
    if (!(value instanceof Date) || isNaN(value.getTime())) {
        value = new Date(value);
        if (!value) return "Invalid Date"
        const formattedDate = value.toISOString().split('T')[0]; //ISO to date ej: 2024-09-14T04:10:04.206Z -> 2024-09-14
        return formattedDate
    }

    // Obtiene los componentes de la fecha
    const año = value.getFullYear();
    const mes = String(value.getMonth() + 1).padStart(2, '0'); // Sumar 1 porque los meses empiezan desde 0
    const dia = String(value.getDate()).padStart(2, '0');

    // Retorna la fecha en formato YYYY-MM-DD
    return `${año}-${mes}-${dia}`;
}