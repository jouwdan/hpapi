import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";
import { FC } from "react";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ page, setPage }) => {
  return (
    <ButtonGroup isAttached variant="outline">
      {page > 1 ? (
        <>
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() => setPage(1)}
          >
            <FiChevronsLeft />
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() => setPage(page - 1)}
          >
            <FiChevronLeft />
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() => setPage(page - 1)}
          >
            {page - 1}
          </Button>
        </>
      ) : (
        <>
          <Button colorScheme="blue" variant="outline" isDisabled>
            <FiChevronsLeft />
          </Button>
          <Button colorScheme="blue" variant="outline" isDisabled>
            <FiChevronLeft />
          </Button>
        </>
      )}
      <Button colorScheme="blue" variant="solid">
        {page}
      </Button>
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => setPage(page + 1)}
      >
        {page + 1}
      </Button>
      {page === 1 && (
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => setPage(page - 1)}
        >
          {page + 2}
        </Button>
      )}
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => setPage(page + 1)}
      >
        <FiChevronRight />
      </Button>
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => setPage(page + 10)}
      >
        <FiChevronsRight />
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;
