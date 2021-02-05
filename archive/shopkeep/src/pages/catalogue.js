import { useState, useEffect } from "react";
import Page from "components/page";
import { DataGrid } from "@material-ui/data-grid";
import data from "../data.json";

const columns = data.columns,
  rows = data.rows;

export default function Catalogue() {
  const [cart, setCart] = useState([]),
    [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(() => {
      if (cart.length > 0) {
        let copper = 0,
          silver = 0,
          gold = 0,
          platinum = 0;
        cart.forEach((element) => {
          copper += element.price;
        });
        while (copper >= 10) {
          copper = copper - 10;
          silver++;
        }
        while (silver >= 10) {
          silver = silver - 10;
          gold++;
        }
        while (gold >= 10) {
          gold = gold - 10;
          platinum++;
        }
        let x = "";
        platinum > 0 && (x += platinum + "pp "),
          gold > 0 && (x += gold + "gp "),
          silver > 0 && (x += silver + "sp "),
          copper > 0 && (x += copper + "cp ");
        return x;
      } else {
        return "-";
      }
    });
  });

  for (let index = 0; index < columns.length; index++) {
    columns[index].flex = 999999;
  }

  for (let index = 0; index < rows.length; index++) {
    rows[index].id = index + 1;
  }

  return (
    <Page>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          padding: "0.25rem",
          left: "50%",
          transform: "translate(-50%, 0)",
          background: "black",
        }}
      >
        <b>TOTAL:</b> {total || "-"}
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        showToolbar
        autoPageSize
        checkboxSelection
        style={{ height: "100%" }}
        density={"compact"}
        onRowSelected={(RowSelectedParams) => {
          if (RowSelectedParams.isSelected) {
            setCart((cart) => {
              let x = [...cart];
              x.push(RowSelectedParams.data);
              return x;
            });
          } else {
            setCart((cart) => {
              let x = [...cart];
              x.forEach((element, index) => {
                if (element.id === RowSelectedParams.data.id) {
                  x.splice(index, 1);
                }
              });
              return x;
            });
          }
        }}
      />
    </Page>
  );
}
