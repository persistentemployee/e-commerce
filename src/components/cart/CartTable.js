import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { withTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead > tr > th {
    font-weight: normal;
    font-size: 12px;
    color: #888;
    text-align: left;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  tbody > tr > td {
    padding: 10px 4px;
    border-bottom: 1px solid #ddd;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.div`
  background-image: url(${props => props.img});
  width: 125px;
  height: 125px;
  background-size: cover;
  background-position: 50%;
  @media (max-width: 650px) {
    width: 62px;
    height: 62px;
  }
`;
const Remove = styled.span`
  font-size: 1.3rem;
  cursor: pointer;
  @media (max-width: 650px) {
    font-size: 1rem;
  }
  @media (min-width: 651px) {
    border-bottom: 2px solid #fff;
    transition: all 0.3s;
    &:hover,
    &:focus {
      border-color: red;
      color: red;
      outline: none;
    }
  }
`;
const Title = styled.div`
  margin-left: 30px;
  @media (max-width: 650px) {
    margin-left: 10px;
  }
`;
const Name = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  > a {
    color: black;
    text-decoration-color: ${props => props.underline};
  }
`;
const Attrs = styled.div`
  color: #888;
  font-size: 12px;
  text-transform: capitalize;
`;

class CartTable extends Component {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.items.map((d, i) => {
            let attrs = [];
            let deleteOnKeyDown = e => {
              if (e.keyCode === 13) {
                this.props.removeItem(i);
              }
            };
            for (let key in d.attr) {
              attrs.push(`${key.replace("_", " ")}: ${d.attr[key]}`);
            }
            attrs = attrs.join(", ");

            return (
              <tr key={`cart${i}`}>
                <td>
                  <Flex>
                    <Image img={d.img} alt={d.name} />
                    <Title>
                      <Name underline={this.props.theme.palette.primary.main}>
                        <Link to={d.url ? d.url : "/"}>{d.name}</Link>
                      </Name>
                      <Attrs>{attrs}</Attrs>
                    </Title>
                  </Flex>
                </td>
                <td>
                  <TextField
                    value={d.quantity}
                    onChange={e => {
                      if (e.target.value < 0) e.target.value = 0;
                      this.props.updateCount(i, e.target.value);
                    }}
                    type="number"
                    margin="none"
                    style={{ width: "40px" }}
                  />
                </td>
                <td>${(d.quantity * 100).toFixed(2)}</td>
                <td onKeyDown={deleteOnKeyDown}>
                  <Remove tabIndex="0" onClick={() => this.props.removeItem(i)}>
                    &#10008;
                  </Remove>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
export default withTheme(CartTable);
