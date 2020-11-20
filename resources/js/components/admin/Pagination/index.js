import React, { Fragment } from 'react';
import { a } from "react-router-dom";

function Pagination(props) {

    const totalPages = props.totalItem / props.itemsPerPage;

    const PageItem = ({ number }) => {
        let numberPage = number + 1;
        const pageActive = props.currentPage === numberPage ? 'text-light bg-primary' : '';
        const disableePageActive = props.currentPage === numberPage ? 'disabled' : '';

        return (
          <li className={`page-item m-0 pl-1 pr-1 ${ disableePageActive }`}>
            <a onClick={() => { props.paginate(numberPage); }} className={`page-a pl-2 pt-1 pr-2 pb-1 border-0 fw-bold cursor-pointer rounded ${ pageActive}`} >
              {numberPage}
            </a>
          </li>);
      };

    const renderHtmlPageNumber = () => {
        const htmlPageNumber = [];

        if(totalPages <= 5) {
            for(let number = 0; number < totalPages; number++) {
                htmlPageNumber.push(<PageItem number={number} key={number} />);
            }

            return htmlPageNumber;
        }
        else {
            const currentPage = props.currentPage;
            const begin = [1, 2, 3];
            const end = [totalPages, totalPages - 1, totalPages - 2];

            if(begin.includes(currentPage)) {
                for(let number = 0; number <= begin.length; number++) {
                    htmlPageNumber.push(<PageItem number={number} key={number} />);
                }

                return (
                    <Fragment>
                        { htmlPageNumber }
                        ...
                        <PageItem number={totalPages - 1} key={totalPages - 1} />
                    </Fragment>
                );
            }else if(end.includes(currentPage)) {
                for(let number = (totalPages - 1) - end.length; number < totalPages; number++) {
                    htmlPageNumber.push(<PageItem number={number} key={number} />);
                }

                return (
                    <Fragment>
                        <PageItem number={0} key={0} />
                        ...
                        { htmlPageNumber }
                    </Fragment>
                );
            } else {
                const between = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];

                for(let number = 0; number < between.length; number++) {
                    htmlPageNumber.push(<PageItem number={between[number] - 1} key={between[number] - 1} />);
                }

                return (
                    <Fragment>
                        <PageItem number={0} key={0} />
                        ...
                        { htmlPageNumber }
                        ...
                        <PageItem number={totalPages - 1} key={totalPages - 1} />
                    </Fragment>
                );
            }
            
        }

    }

    return (
        <div className="pagination mt-5">
            <nav aria-label="Page navigation" id="pagination" className="m-auto">
                <ul className="pagination align-items-center justify-content-center">
                {renderHtmlPageNumber()}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;