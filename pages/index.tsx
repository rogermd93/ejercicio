import { GetStaticProps } from "next";
import { useState } from "react";
import { Container, Typography, List, Card, CardContent } from "@mui/material";

interface Publicacion {
  id: number;
  titulo: string;
  contenido: string;
}

interface PropsInicio {
  publicaciones: Publicacion[];
}

const Inicio: React.FC<PropsInicio> = ({ publicaciones }) => {
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<number | null>(null);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Publicaciones del Blog
      </Typography>

      <List>
        {publicaciones.map((publicacion) => (
          <Card
            key={publicacion.id}
            sx={{
              mb: 2,
              cursor: "pointer",
              transition: "0.3s",
              bgcolor: publicacionSeleccionada === publicacion.id ? "primary.light" : "background.paper",
              "&:hover": { bgcolor: "grey.200" },
            }}
            onClick={() => setPublicacionSeleccionada(publicacion.id)}
          >
            <CardContent>
              <Typography variant="h6">{publicacion.titulo}</Typography>
              {publicacionSeleccionada === publicacion.id && (
                <Typography variant="body2" color="textSecondary">
                  {publicacion.contenido}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const publicaciones: Publicacion[] = await respuesta.json();

  return {
    props: { 
      publicaciones: publicaciones.map((post) => ({
        id: post.id,
        titulo: post.title,
        contenido: post.body
      })),
    },
  };
};

export default Inicio;
