import { useTable } from "@h6s/table";

import type { TableModel } from "@h6s/table";

interface TableProps<T> {
  model: TableModel<T>;
  source: T[];
}

export function Table<T>({ model, source }: TableProps<T>) {
  const [{ theadGroups, rows }] = useTable({
    model,
    source,
  });

  return (
    <table>
      <thead>
        {theadGroups.map(({ theads, getRowProps }) => {
          const props = getRowProps();

          return (
            <tr key={props.id}>
              {theads.map((head) => (
                <th>{head.render({ cellProps: head })}</th>
              ))}
            </tr>
          );
        })}
      </thead>
      <tbody>
        {rows.map(({ cells, getRowProps }) => {
          const props = getRowProps();

          return (
            <tr key={props.id}>
              {cells.map((cell) =>
                cell.colSpan !== 0 ? (
                  <td key={cell.id}>{cell.render({ cellProps: cell })}</td>
                ) : null
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
