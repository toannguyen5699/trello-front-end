// Sap xep array theo mot array khac

export const mapOrder = (array, order, key) => {
    array.sort((a,b) => order.indexOf(a[key]) - order.indexOf(b[key])) 
    return array
}