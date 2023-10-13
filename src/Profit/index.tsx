import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useHooks } from "./hooks";

export const Profit = () => {
  const { data } = useHooks();
  console.log(data);
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <>
                <TableRow
                  key={row.sellItem.item.id}
                  sx={{ "& > *": { borderBottom: "unset" } }}
                >
                  <TableCell component="th" scope="row">
                    {row.sellItem.item.name}
                  </TableCell>
                  <TableCell align="right">
                    +{row.sellPrice - row.buyPrice}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        buy items
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell align="right">Count</TableCell>
                            <TableCell align="right">Total price ($)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.buyItems.map((buyItem) => (
                            <TableRow key={buyItem.item.id}>
                              <TableCell component="th" scope="row">
                                {buyItem.item.name}
                              </TableCell>
                              <TableCell>{buyItem.buyPrice}</TableCell>
                              <TableCell align="right">
                                {buyItem.count}
                              </TableCell>
                              <TableCell align="right">
                                {buyItem.buyPrice
                                  ? buyItem.buyPrice * buyItem.count
                                  : 0}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
