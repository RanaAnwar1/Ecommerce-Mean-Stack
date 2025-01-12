import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const _auth = inject(AuthService)
    const _router = inject(Router)
    if(_auth.isAuthorized()){
      return true;
    }
    else{
      _router.navigate(['/login']);
      return false;
    }
};

export const adminGuard:CanActivateFn = (route,state)=>{
  const _auth = inject(AuthService)
  const _router = inject(Router)
  if(_auth.isAdmin()){
    return true;
  }
  else{
    _router.navigate(['/login']);
    return false;
  }
}
