const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index"); // Upewnij się, że ścieżka jest poprawna

const app = express();
const port = process.env.PORT || 3000;

// Middleware do parsowania JSON
app.use(express.json());

// Funkcja do kolorowego logowania statusów
const colorizeStatus = (statusCode: number): string => {
  if (statusCode >= 200 && statusCode < 300) {
    return "\x1b[30m\x1b[102m"; // Czarny tekst na jasnym zielonym tle dla 2xx
  } else if (statusCode >= 400 && statusCode < 500) {
    return "\x1b[30m\x1b[41m"; // Czarny tekst na czerwonym tle dla 4xx
  } else if (statusCode >= 500) {
    return "\x1b[30m\x1b[43m"; // Czarny tekst na żółtym tle dla 5xx
  }
  return "\x1b[0m"; // Domyślny kolor
};

// Middleware do logowania ścieżki i statusu
app.use(
  (
    req: { path: any },
    res: { send: { (body: any): any; bind?: any }; statusCode: number },
    next: () => void
  ) => {
    const originalSend = res.send.bind(res);

    res.send = function (body: any) {
      const color = colorizeStatus(res.statusCode);
      console.log(`${color}=> ${req.path}, ${res.statusCode}\x1b[0m`);
      return originalSend(body);
    };

    next();
  }
);

// Ustawienie opcji strictQuery
mongoose.set("strictQuery", true); // lub false, w zależności od tego, co chcesz osiągnąć

// Reszta twojego kodu...

mongoose
  .connect("mongodb://localhost:27017/casHouse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Połączono z MongoDB"))
  .catch((err: any) => console.error("Błąd połączenia z MongoDB:", err));

// Użyj tras
app.use(routes); // Upewnij się, że routes to router

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});