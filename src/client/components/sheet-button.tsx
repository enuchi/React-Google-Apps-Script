import { FunctionalComponent, h } from 'preact';
import '../styles.css';

interface SheetButtonProps {
  name: {
    sheetIndex: number;
    text: string;
    isActive: boolean;
  };
  deleteButtonHandler: Function;
  clickSheetNameHandler: Function;
}

export const SheetButton: FunctionalComponent<SheetButtonProps> = (
  props: SheetButtonProps
) => {
  const { name, deleteButtonHandler, clickSheetNameHandler } = props;

  const { sheetIndex, text, isActive } = name;

  return (
    <div className="sheetLine">
      <button onClick={(e: Event) => deleteButtonHandler(e, sheetIndex)}>
        X
      </button>
      <span
        onClick={(e: Event) => clickSheetNameHandler(e, text)}
        className={'sheetNameText ' + (isActive ? 'active-sheet' : '')}
      >
        {text}
      </span>
    </div>
  );
};
