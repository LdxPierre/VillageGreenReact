import { Box, Pagination, Stack, Typography } from "@mui/material";
import { PaginationInterface } from "../../../types";

interface Props {
  pagination: PaginationInterface;
  fetchProducts: (queryParams?: URLSearchParams) => void;
  page: number;
  setPage: (page: number) => void;
  total: number;
}

const PaginationLinks = ({ pagination, fetchProducts, page, setPage, total }: Props): JSX.Element => {
  const lastPage = Number(pagination["hydra:last"].charAt(pagination["hydra:last"].length - 1));

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value != page) {
      const queryParams = new URLSearchParams();
      queryParams.append("page", String(value));
      fetchProducts(queryParams);
      setPage(value);
    }
  };

  return (
    <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
      <Typography>Total de produits : {total}</Typography>
      <Stack spacing={2} direction={"row"} justifyContent={"flex-end"} sx={{ paddingY: 1 }}>
        <Pagination count={lastPage} page={page} onChange={handleChangePage} />
      </Stack>
    </Box>
  );
};

export default PaginationLinks;
