import { StackActions, NavigationActions } from 'react-navigation';

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

export function navigate(routeName, params = {}) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

export function pop() {
    const popAction = StackActions.pop({
        n: 1,
    });

    _navigator.dispatch(popAction);
}

export function resetToScreen(screen) {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screen })],
    });
    _navigator.dispatch(resetAction);
}