import Link from 'next/link';
import React from 'react';

export default function DropdownLink(props) {
    let {href, children} = props;
    return (
        <Link className="flex flex-col border-b border-gray-200 px-4 py-4" href={href}>
            {children}
        </Link>
    );
}
