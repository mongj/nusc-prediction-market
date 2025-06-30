const serializeDates = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof Date) {
    return obj.toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(serializeDates);
  }

  if (typeof obj === "object") {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, serializeDates(value)]));
  }

  return obj;
};

export { serializeDates };
