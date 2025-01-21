'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const UrlCell = (props)=>{
    const { collectionSlug, rowData } = props;
    const breadcrumbs = (rowData.breadcrumbs || []).filter((c)=>Boolean(c.id && c.doc)).map((c)=>c).reverse();
    return /*#__PURE__*/ _jsx("div", {
        children: breadcrumbs.map((b, index)=>{
            const href = `/admin/collections/${collectionSlug}/${b.doc}`;
            return /*#__PURE__*/ _jsxs("span", {
                children: [
                    /*#__PURE__*/ _jsx("a", {
                        href: href,
                        children: b.label || '<No Label>'
                    }),
                    index < breadcrumbs.length - 1 && /*#__PURE__*/ _jsx("span", {
                        children: " / "
                    })
                ]
            }, index);
        })
    });
};

//# sourceMappingURL=UrlCell.js.map