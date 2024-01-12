import React, { useEffect } from "react"
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom"
import { VisitorOtherPage } from "./VisitorOtherPage"
import { VisitMyPage } from "./VisitMyPage"
import "../../../css/my_page.css"




export function MemberPage(props: any) {
    //Initializations
    const member = useRouteMatch(),
        useQuery = () => {
            const { search } = useLocation();
            return React.useMemo(() => (new URLSearchParams(search)), [search])
        },
        chosen_mb_id: string | null = useQuery().get("mb_id") ?? null,
        chosen_art_id: string | null = useQuery().get("art_id") ?? null;
    //Handlers
    return (
        <div className="member_page">
            <Switch>
                <Route path={`${member.path}/other`}>
                    <VisitorOtherPage
                        chosen_mb_id={chosen_mb_id}
                        chosen_art_id={chosen_art_id}
                    />
                </Route>
                <Route path={`${member.path}/`}>
                    <VisitMyPage
                        chosen_art_id={chosen_art_id}
                    />
                </Route>
            </Switch>
        </div>
    )
}